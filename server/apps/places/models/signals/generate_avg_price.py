from django.db.models import Avg
from django.db.models.signals import post_save
from django.dispatch import receiver

from apps.places.models import Dish, Place


@receiver(post_save, sender=Dish)
def generate_avg_price(sender, instance, **kwargs):
    average_price = Dish.objects.filter(place=instance.place.id).aggregate(Avg('price'))['price__avg']
    Place.objects.filter(id=instance.place.id).update(average_price=average_price)
