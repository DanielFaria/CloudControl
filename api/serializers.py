from rest_framework import serializers
from api.models import *
from django.contrib.auth.models import User


class ProvedorSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Provedor
        fields = ( 'nome','email', 'site')


class SistemaOperacionalSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = SistemaOperacional
        fields = ( 'nome')

class PacoteSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Pacote
        fields = ( 'nome', 'quantidadeCpu', 'memoria','tamanhoDisco','valorHora','sistemaOperacional', 'provedor' ) 
                  
