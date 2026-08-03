from django.db import models

class Ativo(models.Model):
    STATUS_CHOICES = [
        ('disponivel', 'Disponível'),
        ('em_uso', 'Em uso'),
        ('manutencao', 'Em manutenção'),
        ('baixado', 'Baixado'),
    ]

    nome = models.CharField(max_length=100)
    numero_patrimonio = models.CharField(max_length=50, unique=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='disponivel')
    responsavel = models.CharField(max_length=100, blank=True)
    data_aquisicao = models.DateField(null=True, blank=True)

    def __str__(self):
        return f"{self.nome} ({self.numero_patrimonio})"


class Chamado(models.Model):
    STATUS_CHOICES = [
        ('aberto', 'Aberto'),
        ('em_andamento', 'Em andamento'),
        ('resolvido', 'Resolvido'),
        ('cancelado', 'Cancelado'),
    ]

    PRIORIDADE_CHOICES = [
        ('baixa', 'Baixa'),
        ('media', 'Média'),
        ('alta', 'Alta'),
    ]

    titulo = models.CharField(max_length=150)
    descricao = models.TextField(blank=True)
    ativo = models.ForeignKey(Ativo, on_delete=models.SET_NULL, null=True, blank=True, related_name='chamados')
    solicitante = models.CharField(max_length=100)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='aberto')
    prioridade = models.CharField(max_length=10, choices=PRIORIDADE_CHOICES, default='media')
    data_abertura = models.DateTimeField(auto_now_add=True)
    data_fechamento = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"#{self.pk} - {self.titulo}"