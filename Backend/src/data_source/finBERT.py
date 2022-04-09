from __future__ import print_function, division
import torch
import torch.nn.functional as F
from pytorch_pretrained_bert import BertTokenizer
import torch
import torch.nn as nn
import torch.optim as optim
from pytorch_pretrained_bert import BertTokenizer, BertModel, BertForMaskedLM, BertConfig


class BertClassification(nn.Module):

    def __init__(self, weight_path, num_labels=2, vocab="base-cased"):
        super(BertClassification, self).__init__()
        self.num_labels = num_labels
        self.vocab = vocab
        if self.vocab == "base-cased":
            self.bert = BertModel.from_pretrained(weight_path)
            self.config = BertConfig(vocab_size_or_config_json_file=28996, hidden_size=768, num_hidden_layers=12,
                                     num_attention_heads=12, intermediate_size=3072)

        elif self.vocab == "base-uncased":
            self.bert = BertModel.from_pretrained(weight_path)
            self.config = BertConfig(vocab_size_or_config_json_file=30522, hidden_size=768, num_hidden_layers=12,
                                     num_attention_heads=12, intermediate_size=3072)

        elif self.vocab == "finance-cased":
            self.bert = BertModel.from_pretrained(weight_path)
            self.config = BertConfig(vocab_size_or_config_json_file=28573, hidden_size=768, num_hidden_layers=12,
                                     num_attention_heads=12, intermediate_size=3072)

        elif self.vocab == "finance-uncased":
            self.bert = BertModel.from_pretrained(weight_path)
            self.config = BertConfig(vocab_size_or_config_json_file=30873, hidden_size=768, num_hidden_layers=12,
                                     num_attention_heads=12, intermediate_size=3072)

        self.dropout = nn.Dropout(self.config.hidden_dropout_prob)
        self.classifier = nn.Linear(self.config.hidden_size, num_labels)
        nn.init.xavier_normal(self.classifier.weight)

    def forward(self, input_ids, token_type_ids=None, attention_mask=None, labels=None, graphEmbeddings=None):
        _, pooled_output = self.bert(input_ids, token_type_ids, attention_mask)
        pooled_output = self.dropout(pooled_output)

        logits = self.classifier(pooled_output)

        return logits


class dense_opt():
    def __init__(self, model):
        super(dense_opt, self).__init__()
        self.lrlast = .001
        self.lrmain = .00001
        self.optim = optim.Adam(
            [{"params": model.bert.parameters(), "lr": self.lrmain},
             {"params": model.classifier.parameters(), "lr": self.lrlast},
             ])

    def get_optim(self):
        return self.optim


labels = {0: 'neutral', 1: 'positive', 2: 'negative'}
num_labels = len(labels)
vocab = "finance-uncased"
vocab_path = './analyst_tone/vocab'
pretrained_weights_path = "./analyst_tone/pretrained_weights"  # this is pre-trained FinBERT weights
fine_tuned_weight_path = "./analyst_tone/fine_tuned.pth"  # this is fine-tuned FinBERT weights
max_seq_length = 512
device = 'cuda:0'

model = BertClassification(weight_path=pretrained_weights_path, num_labels=num_labels, vocab=vocab)

model.load_state_dict(torch.load(fine_tuned_weight_path, map_location=torch.device('cuda:0')))
# model.load_state_dict(torch.load(fine_tuned_weight_path))
model.to(device)

tokenizer = BertTokenizer(vocab_file=vocab_path, do_lower_case=True, do_basic_tokenize=True)

model.eval()


def NLPScoring(sentences):
    res = 0
    for sent in sentences:
        tokenized_sent = tokenizer.tokenize(sent)
        if len(tokenized_sent) > max_seq_length:
            tokenized_sent = tokenized_sent[:max_seq_length]

        ids_review = tokenizer.convert_tokens_to_ids(tokenized_sent)
        mask_input = [1] * len(ids_review)
        padding = [0] * (max_seq_length - len(ids_review))
        ids_review += padding
        mask_input += padding
        input_type = [0] * max_seq_length

        input_ids = torch.tensor(ids_review).to(device).reshape(-1, max_seq_length)
        attention_mask = torch.tensor(mask_input).to(device).reshape(-1, max_seq_length)
        token_type_ids = torch.tensor(input_type).to(device).reshape(-1, max_seq_length)

        with torch.set_grad_enabled(False):
            outputs = model(input_ids, token_type_ids, attention_mask)
            outputs = F.softmax(outputs, dim=1)
            if labels[torch.argmax(outputs).item()] == 'positive':
                res += 1
            if labels[torch.argmax(outputs).item()] == 'negative':
                res -= 1
                # print(sent, '\nFinBERT predicted sentiment: ', labels[torch.argmax(outputs).item()], '\n')
    return res
