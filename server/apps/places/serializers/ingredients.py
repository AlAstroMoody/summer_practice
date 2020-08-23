from rest_framework.serializers import ModelSerializer

from apps.places.models import Ingredient


class IngredientSerializer(ModelSerializer):
    class Meta:
        model = Ingredient
        fields = ('id', 'name', 'calories')
