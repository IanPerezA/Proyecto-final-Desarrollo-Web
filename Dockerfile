# Usar la imagen base de TensorFlow que incluye Jupyter y TensorFlow
FROM tensorflow/tensorflow:2.9.1

# Crear y configurar el directorio de trabajo
WORKDIR /app

# Copiar los archivos de tu proyecto al contenedor
COPY . /app

# Instalar las dependencias necesarias
RUN pip install --upgrade pip
RUN pip install tensorflow librosa matplotlib Pillow scikit-learn

# Exponer el puerto para Jupyter Notebook (si es necesario)
EXPOSE 8888

# Comando por defecto para ejecutar (puedes cambiarlo si necesitas)
CMD ["bash"]
