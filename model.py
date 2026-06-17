# model.py
# Importing necessary libraries
import tensorflow as tf
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.optimizers import RMSprop
from keras.callbacks import EarlyStopping
import matplotlib.pyplot as plt
import scipy  # Needed to avoid "name 'scipy' is not defined" error

# -----------------------------
# ImageDataGenerator and training data setup
batch_size = 32
train_datagen = ImageDataGenerator(rescale=1./255)

train_generator = train_datagen.flow_from_directory(
    'Data',
    target_size=(200, 200),
    batch_size=batch_size,
    classes=[
        "Citrus_Black_spot", "Citrus_canker", "Citrus_greening",
        "Citrus_healthy", "Citrus_Melanose", "Rice_Bacterial_leaf_blight",
        "Rice_Brown_spot", "Rice_Leaf_smut", "Tomato_Bacterial_spot",
        "Tomato_Early_blight", "Tomato_healthy", "Tomato_Late_blight",
        "Tomato_Leaf_Mold", "Tomato_Septoria_leaf_spot"
    ],
    class_mode='categorical'
)

# -----------------------------
# Model setup
model = tf.keras.models.Sequential([
    tf.keras.layers.Conv2D(16, (3, 3), activation='relu', input_shape=(200, 200, 3)),
    tf.keras.layers.MaxPooling2D(2, 2),
    tf.keras.layers.Conv2D(32, (3, 3), activation='relu'),
    tf.keras.layers.MaxPooling2D(2, 2),
    tf.keras.layers.Conv2D(64, (3, 3), activation='relu'),
    tf.keras.layers.MaxPooling2D(2, 2),
    tf.keras.layers.Conv2D(64, (3, 3), activation='relu'),
    tf.keras.layers.MaxPooling2D(2, 2),
    tf.keras.layers.Conv2D(64, (3, 3), activation='relu'),
    tf.keras.layers.MaxPooling2D(2, 2),
    tf.keras.layers.Flatten(),
    tf.keras.layers.Dense(128, activation='relu'),
    tf.keras.layers.Dense(14, activation='softmax')
])

model.summary()

# -----------------------------
# Compile the model
model.compile(
    loss='categorical_crossentropy',
    optimizer=RMSprop(learning_rate=0.001),
    metrics=['accuracy']
)

# -----------------------------
# Early stopping to avoid overfitting
early = EarlyStopping(monitor='loss', patience=5, restore_best_weights=True)

# -----------------------------
# Training the model
total_sample = train_generator.n
n_epochs = 2  # Increase for better accuracy

history = model.fit(
    train_generator,
    steps_per_epoch=int(total_sample / batch_size),
    epochs=n_epochs,
    verbose=1,
    callbacks=[early]  # Early stopping callback
)

# -----------------------------
# Saving the trained model
model.save('leafmodel.h5')
print("Model saved as leafmodel.h5")

# -----------------------------
# Plotting accuracy and loss
acc = history.history['accuracy']
loss = history.history['loss']
epochs = range(1, len(acc) + 1)

# Accuracy plot
plt.plot(epochs, acc, 'b', label='Accuracy')
plt.title('Training Accuracy')
plt.xlabel('Epochs')
plt.ylabel('Accuracy')
plt.legend()

# Loss plot
plt.figure()
plt.plot(epochs, loss, 'r', label='Loss')
plt.title('Training Loss')
plt.xlabel('Epochs')
plt.ylabel('Loss')
plt.legend()

plt.show()
