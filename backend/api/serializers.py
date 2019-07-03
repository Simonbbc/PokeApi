from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Pokemon, Evolution, Types


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('url', 'username', 'email', 'groups')


class EvolutionSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Evolution
        fields = ('pre_evolution_key', 'next_evolution_key', 'method', 'level')


class TypesSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Types
        fields = ('name',)


class PokemonSerializer(serializers.HyperlinkedModelSerializer):
    evolutions = EvolutionSerializer(many=True, read_only=True)
    types = TypesSerializer(many=True, read_only=True)

    class Meta:
        model = Pokemon
        fields = ('id', 'name', 'image', 'description', 'types', 'evolutions')



