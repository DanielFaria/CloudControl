from rest_framework import serializers
from api.models import *
from django.contrib.auth.models import User


class ProvedorSerializer(serializers.HyperlinkedModelSerializer):
    #pacotes = serializers.HyperlinkedRelatedField(queryset=Pacote.objects.all(), view_name='pacote-detail', many=True)
    

    class Meta:
        model = Provedor
        queryset = Provedor.objects.all()
        fields = ( 'pk','nome','email', 'site',)
    
   
class SistemaOperacionalSerializer(serializers.HyperlinkedModelSerializer):
    #pacotes = serializers.HyperlinkedRelatedField(queryset=Pacote.objects.all(), view_name='pacote-detail', many=True)
    
    class Meta:
        model = SistemaOperacional
        queryset = SistemaOperacional.objects.all()
        fields = ( 'pk','nome', )

class PacoteSerializer(serializers.HyperlinkedModelSerializer):
    
    sistemaOperacional_id =  serializers.PrimaryKeyRelatedField(queryset=SistemaOperacional.objects.all(),
        source="sistemaOperacional", write_only=True)
    sistemaOperacional    =  SistemaOperacionalSerializer(read_only=True)

    provedor_id = serializers.PrimaryKeyRelatedField(queryset=Provedor.objects.all()
        ,source="provedor", write_only=True)

    provedor = ProvedorSerializer(read_only=True) 

    class Meta:
        model = Pacote
        fields = ( 'pk','nome', 'quantidadeCpu', 'memoria','tamanhoDisco','valorHora','sistemaOperacional','sistemaOperacional_id', 
            'provedor','provedor_id' ) 

    
