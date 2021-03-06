from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from api import views

urlpatterns = [
    url(r'^pacotes/$', views.PacoteList.as_view()),
    url(r'^pacotes/(?P<pk>[0-9]+)/$', views.PacoteDetail.as_view()),
    url(r'^provedores/$', views.ProvedorList.as_view()),
    url(r'^provedores/(?P<pk>[0-9]+)/$', views.ProvedorDetail.as_view()),
    url(r'^sistemas/$', views.SistemaOperacionalList.as_view()),
    url(r'^sistemas/(?P<pk>[0-9]+)/$', views.SistemaOperacionalDetail.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)