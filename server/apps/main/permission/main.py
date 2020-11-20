from rest_framework import permissions

from apps.places.models import Place


class IsOwnerOrReadOnly(permissions.BasePermission):

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        if obj.owner == request.user:
            return True


class IsOwnerPlaceWithDishOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method not in permissions.SAFE_METHODS:
            place = Place.objects.get(pk=request.data.get('place'))
            if place:
                print(place)
                return request.user and request.user.is_authenticated and place.owner == request.user
        return True


