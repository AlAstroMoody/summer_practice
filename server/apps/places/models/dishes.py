from django.db import models

from apps.places.models import Place, Ingredient


class Dish(models.Model):
    name = models.CharField(max_length=80)
    photo = models.ImageField(upload_to='upload/dish', blank=True)
    total_calories = models.PositiveSmallIntegerField(blank=True, null=True)
    price = models.PositiveSmallIntegerField(blank=True, null=True)
    ingredients = models.ManyToManyField(Ingredient)
    place = models.ForeignKey(Place, on_delete=models.CASCADE)

    class Meta:
        verbose_name = 'Блюдо'
        verbose_name_plural = 'Блюда'
        ordering = ('id',)

    def __str__(self):
        return self.name
