from rest_framework import serializers
from api.models import *
from django.contrib.auth.models import User


class ProvedorSerializer(serializers.HyperlinkedModelSerializer):
    pacotes = serializers.HyperlinkedRelatedField(queryset=Pacote.objects.all(), view_name='pacote-detail', many=True)
    

    class Meta:
        model = Provedor
        queryset = Provedor.objects.all()
        fields = ( 'pk','nome','email', 'site','pacotes',)
    
    def get_related_field(self, model_field):
            # Handles initializing the `subcategories` field
            return ProvedorSerializer()

class SistemaOperacionalSerializer(serializers.HyperlinkedModelSerializer):
    pacotes = serializers.HyperlinkedRelatedField(queryset=Pacote.objects.all(), view_name='pacote-detail', many=True)
    
    class Meta:
        model = SistemaOperacional
        queryset = SistemaOperacional.objects.all()
        fields = ( 'pk','nome','pacotes', )

class PacoteSerializer(serializers.HyperlinkedModelSerializer):
    sistemaOperacional =  serializers.PrimaryKeyRelatedField(queryset=SistemaOperacional.objects.all())
    provedor           =  serializers.PrimaryKeyRelatedField(queryset=Provedor.objects.all())

    class Meta:
        model = Pacote
        fields = ( 'pk','nome', 'quantidadeCpu', 'memoria','tamanhoDisco','valorHora','sistemaOperacional', 'provedor' ) 

    def create(self, validated_data):
        #user = validated_data.get('user')

        pacote = Pacote.objects.create(**validated_data)

        
        pacote.save()

        return pacote
                  
