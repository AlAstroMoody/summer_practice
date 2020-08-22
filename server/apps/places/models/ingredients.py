from django.db import models


class Ingredient(models.Model):
    name = models.CharField(max_length=80)
    calories = models.PositiveSmallIntegerField(null=True)

    class Meta:
        verbose_name = 'Ингредиент'
        verbose_name_plural = 'Ингредиенты'
        ordering = ('id',)

    def __str__(self):
        return self.name
