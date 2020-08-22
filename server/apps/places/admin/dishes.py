from django.contrib import admin

from apps.places.admin import IngredientsInDishInline
from apps.places.models import Dish


@admin.register(Dish)
class DishAdmin(admin.ModelAdmin):
    inlines = (IngredientsInDishInline,)
    exclude = ('ingredients',)
