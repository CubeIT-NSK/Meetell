"""
URL configuration for backend_settings project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from meetell import views

urlpatterns = [
    path('api/faq', views.get_faq),
    path('api/trips', views.get_trips),
    path('api/user', views.get_user),
    path('api/profile', views.update_user),
    path('api/photo', views.photo_user),
    path('api/trip', views.user_trip_registr),
    path('api/history', views.get_user_history),
    path('api/update_trip', views.update_state_trip),
]
