from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^ajax_select/$',views.ajax_select, name='ajax_select'),
    url(r'^ajax_add/$',views.ajax_add, name='ajax_add'),
    url(r'^ajax_delete/$',views.ajax_delete, name='ajax_delete'),
    url(r'^ajax_update/$',views.ajax_update, name='ajax_update'),
]
