import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
import joblib
import re

# --- 1. Feature Extraction ---
# We will create features based on the URL's structure and content.

# (Keep the 'import re' at the top of your files)

def extract_features(url):
    # We will use a dictionary to store features for clarity
    features = {}

    # --- Domain and Path based Features ---
    try:
        domain = url.split('/')[2]
    except:
        domain = "" # Handle cases with no domain

    features['url_length'] = len(url)
    features['domain_length'] = len(domain)
    features['num_dots'] = url.count('.')
    features['num_slashes'] = url.count('/')
    features['num_dashes'] = url.count('-')
    features['num_underscores'] = url.count('_')
    features['num_queries'] = url.count('?')
    features['num_equals'] = url.count('=')
    features['num_at'] = url.count('@')
    features['num_digits'] = sum(c.isdigit() for c in url)
    
    # --- Boolean Features (Presence of suspicious elements) ---
    features['has_ip_address'] = 1 if re.search(r'\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b', url) else 0
    features['has_https'] = 1 if 'https' in url else 0
    
    # Presence of sensitive words
    sensitive_words = ['secure', 'login', 'signin', 'bank', 'account', 'update', 'verify', 'webscr', 'password']
    features['sensitive_words_count'] = sum([url.lower().count(word) for word in sensitive_words])

    # Convert dictionary values to a list for the model
    return list(features.values())

# --- 2. Load and Preprocess Data ---
print("Loading dataset...")
data = pd.read_csv('phishing_site_urls.csv')

# Drop any rows with missing values
data = data.dropna()

print("Extracting features from URLs...")
# Extract features from each URL
feature_set = data['URL'].apply(extract_features).tolist()

# The labels are in the 'Label' column ('bad' for phishing, 'good' for legitimate)
labels = data['Label'].apply(lambda x: 1 if x == 'bad' else 0).tolist()

# --- 3. Train the Model ---
print("Splitting data and training the model...")

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(feature_set, labels, test_size=0.2, random_state=42)

# We will use a RandomForestClassifier, which is a powerful and popular choice.
model = RandomForestClassifier(n_estimators=100, random_state=42)

# Train the model
model.fit(X_train, y_train)

# --- 4. Evaluate the Model ---
print("Evaluating model...")
predictions = model.predict(X_test)
accuracy = accuracy_score(y_test, predictions)
print(f"Model Accuracy: {accuracy * 100:.2f}%")

# --- 5. Save the Trained Model ---
print("Saving the trained model to 'phishing_detector_model.joblib'...")
joblib.dump(model, 'phishing_detector_model.joblib')
print("Model saved successfully!")

# Also save the feature extraction function for the API to use
# Although we will just copy the function, in a larger project you would save it properly.