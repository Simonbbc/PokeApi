from django.contrib.auth.models import User
from rest_framework import viewsets
from backend.api.serializers import UserSerializer, PokemonSerializer
from .models import Pokemon
from django.shortcuts import render


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer


class PokemonViewSet(viewsets.ModelViewSet):
    queryset = Pokemon.objects.all()
    serializer_class = PokemonSerializer


def pokemon_list(request):
    return render(request, 'api/home_page.html', {})

