from django.conf.urls import include, url
from django.contrib import admin

urlpatterns = [
    url(r'^DB_site/', include('DB_site.urls')),
    url(r'^admin/', admin.site.urls),
]
