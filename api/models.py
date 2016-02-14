from __future__ import unicode_literals

from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

# Create your models here.
class Provedor(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    nome  = models.CharField(max_length=100, blank=False)
    email = models.CharField(max_length=100, blank=True, default='')
    site  = models.CharField(max_length=100, blank=False)

    class Meta:
        ordering = ('created',)

class SistemaOperacional(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    nome  = models.CharField(max_length=100, blank=False)
    class Meta:
        ordering = ('created',)	

 
        
class Pacote(models.Model):
    created       = models.DateTimeField(auto_now_add=True)
    nome          = models.CharField(max_length=100, blank=False)

    quantidadeCpu = models.IntegerField(validators=[MinValueValidator(1),
                                       MaxValueValidator(1000)])
    memoria       = models.IntegerField(validators=[MinValueValidator(1),
                                       MaxValueValidator(1000)])

    tamanhoDisco  = models.IntegerField(validators=[MinValueValidator(1),
                                       MaxValueValidator(1000)])

    valorHora     = models.DecimalField(max_digits=12, decimal_places=2,  default=0.0)

    #Chaves  estrangeiras 
    sistemaOperacional = models.ForeignKey(SistemaOperacional,related_name='pacotes', on_delete=models.CASCADE)
    provedor           = models.ForeignKey(Provedor,related_name='pacotes', on_delete=models.CASCADE)

    class Meta:
        ordering = ('created',)
    





  