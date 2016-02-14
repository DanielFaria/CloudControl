from django.shortcuts import render

from api.models import *
from api.serializers import *

from rest_framework import generics
from django.contrib.auth.models import User
from rest_framework import permissions




class PacoteList(generics.ListCreateAPIView):
    queryset = Pacote.objects.all()
    serializer_class = PacoteSerializer
    


class PacoteDetail(generics.ListCreateAPIView):
    queryset = Pacote.objects.all()
    serializer_class = PacoteSerializer



class ProvedorList(generics.ListCreateAPIView):
    queryset = Provedor.objects.all()
    serializer_class = ProvedorSerializer 
    


class ProvedorDetail(generics.ListCreateAPIView):
    queryset = Provedor.objects.all()
    serializer_class = ProvedorSerializer