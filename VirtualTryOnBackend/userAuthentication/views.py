from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import AllowAny

class MyTokenObtainPairView(TokenObtainPairView):
    permission_classes = [AllowAny] 

token_obtain_pair = MyTokenObtainPairView.as_view()
