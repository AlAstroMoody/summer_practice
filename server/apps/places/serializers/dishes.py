from rest_framework.serializers import ModelSerializer

from apps.places.models import Dish


class DishSerializer(ModelSerializer):
    class Meta:
        model = Dish
        fields = ('id', 'name', 'photo', 'total_calories',
                  'price', 'ingredients', 'place')
        extra_kwargs = {
            'total_calories': {'read_only': True}
        }
