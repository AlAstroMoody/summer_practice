from django.contrib import admin

from apps.places.models import Dish, Ingredient


class IngredientsInDishInline(admin.TabularInline):
    model = Dish.ingredients.through
    extra = 1


@admin.register(Ingredient)
class IngredientAdmin(admin.ModelAdmin):
    list_display = ('name', 'calories')
    inlines = (IngredientsInDishInline,)
