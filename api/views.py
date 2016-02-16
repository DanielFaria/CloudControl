from django.shortcuts import render

from api.models import *
from api.serializers import *

from rest_framework import generics
from django.contrib.auth.models import User
from rest_framework import permissions




class PacoteList(generics.ListCreateAPIView):
    queryset = Pacote.objects.all()
    serializer_class = PacoteSerializer
    
    def get_queryset(self):
        #TODO - Considerar depois refatorar para DJANGO-FILTERS

        queryset = Pacote.objects.all().order_by('nome')

        cpu     = self.request.query_params.get('cpu', None)
        memoria = self.request.query_params.get('memoria', None)
        sistema = self.request.query_params.get('sistema', None)
        disco   = self.request.query_params.get('tamanhoDisco', None)

        if sistema is not None:
            queryset = queryset.filter(sistemaOperacional_id=sistema)
        
        if disco is not None:
            queryset = queryset.filter(tamanhoDisco=disco)

        if cpu is not None:
            queryset = queryset.filter(quantidadeCpu=cpu)

        if memoria is not None:
            queryset = queryset.filter(memoria=memoria)

        return queryset


class PacoteDetail(generics.ListCreateAPIView):
    queryset = Pacote.objects.all()
    serializer_class = PacoteSerializer



class ProvedorList(generics.ListCreateAPIView):
    queryset = Provedor.objects.all().order_by('nome')
    serializer_class = ProvedorSerializer 
    


class ProvedorDetail(generics.ListCreateAPIView):
    queryset = Provedor.objects.all()
    serializer_class = ProvedorSerializer
    
   

class SistemaOperacionalList(generics.ListCreateAPIView):
    queryset = SistemaOperacional.objects.all().order_by('nome')
    serializer_class = SistemaOperacionalSerializer
    


class SistemaOperacionalDetail(generics.ListCreateAPIView):
    serializer_class = SistemaOperacionalSerializer
    queryset = Provedor.objects.all()
    
