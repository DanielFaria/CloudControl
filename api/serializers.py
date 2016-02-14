from rest_framework import serializers
from api.models import *
from django.contrib.auth.models import User


class ProvedorSerializer(serializers.HyperlinkedModelSerializer):
    pacotes = serializers.HyperlinkedRelatedField(queryset=Pacote.objects.all(), view_name='pacote-detail', many=True)
    class Meta:
        model = Provedor
        fields = ( 'nome','email', 'site','pacotes')


class SistemaOperacionalSerializer(serializers.HyperlinkedModelSerializer):
    pacotes = serializers.HyperlinkedRelatedField(queryset=Pacote.objects.all(), view_name='pacote-detail', many=True)
    class Meta:
        model = SistemaOperacional
        fields = ( 'nome', 'pacotes')

class PacoteSerializer(serializers.HyperlinkedModelSerializer):
    sistemaOperacional = SistemaOperacionalSerializer()
    provedor           =  ProvedorSerializer()

    class Meta:
        model = Pacote
        fields = ( 'nome', 'quantidadeCpu', 'memoria','tamanhoDisco','valorHora','sistemaOperacional', 'provedor' ) 
                  
