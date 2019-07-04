from django.core.management.base import BaseCommand
from backend.api.models import Pokemon, Types, Evolution
import json

# TODO: Updaten funktioniert nicht richtig.
class Command(BaseCommand):

    def handle(self, *args, **options):
        path = './backend/import/pokemon-v1.json'
        with open(path) as file:
            pokemon_list = json.load(file)
            for pokemon in pokemon_list:
                for type in pokemon['types']:
                    type_object, created_type = Types.objects.update_or_create(
                        name=type,
                        defaults={
                            'name': type,
                        }
                    )
                    if created_type:
                        print("New Type created: ", type_object.name)

                    type_object.save()
                for evolution in pokemon['evolutions']:
                    evolution_object, created_evolution = Evolution.objects.update_or_create(
                        next_evolution_key=evolution['to'],
                        defaults={
                            'pre_evolution_key': pokemon['name'],
                            'next_evolution_key': evolution['to'],
                            'method': evolution['method'],
                            'level': evolution['level'] if 'level' in evolution.keys() else 0,
                        }
                    )
                    if created_evolution:
                        print("New Evolution created: ", evolution_object.next_evolution_key)

                    evolution_object.save()

                pokemon_object, created_pokemon = Pokemon.objects.update_or_create(
                    id=pokemon['_id'],
                    defaults={
                        'id': pokemon['_id'],
                        'name': pokemon['name'],
                        'image': pokemon['art_url'],
                        'description': pokemon['description'],
                    }
                )
                if created_pokemon:
                    print("New Pokemon created: ", pokemon_object.name)

                for type in pokemon['types']:
                    pokemon_object.types.add(Types.objects.get(name=type))

                for pokemon in Pokemon.objects.all():
                    for evolution in Evolution.objects.all().filter(pre_evolution_key=pokemon_object.name):
                        pokemon_object.evolutions.add(evolution)

                pokemon_object.save()



