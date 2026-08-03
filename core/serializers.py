from rest_framework import serializers
from .models import Ativo, Chamado

class AtivoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ativo
        fields = '__all__'

class ChamadoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chamado
        fields = '__all__'