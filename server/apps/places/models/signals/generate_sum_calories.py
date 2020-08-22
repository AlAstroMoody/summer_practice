from django.db.models import Sum
from django.db.models.signals import m2m_changed
from django.dispatch import receiver

from apps.places.models import Dish, Ingredient


@receiver(m2m_changed, sender=Dish.ingredients.through)
def generate_sum_calories(sender, instance, **kwargs):
    instance.total_calories = Dish.objects.filter(id=instance.pk).aggregate(Sum(
        'ingredients__calories'))['ingredients__calories__sum']
    instance.save()

