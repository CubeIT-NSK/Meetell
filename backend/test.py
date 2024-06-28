from PIL import Image
from pillow_heif import register_heif_opener
from io import BytesIO
import base64

register_heif_opener()

def resize_photo(image_base):
    
    fixed_width = 500
    img = Image.open(BytesIO(base64.b64decode(image_base)))

    width_percent = (fixed_width / float(img.size[0]))
    height_size = int((float(img.size[1]) * float(width_percent)))

    new_image = img.resize((fixed_width, height_size))
    new_image.convert("RGB")
    data = save_to_base_64(new_image)

    new_image_low = img.resize((50, 50))
    new_image_low.convert("RGB")
    data_low = save_to_base_64(new_image_low)
    pass

def save_to_base_64(img: Image):
    buffered = BytesIO()
    img.save(buffered, format="JPEG", quality=90, optimize=True)
    data_url = 'data:image/jpeg;base64,' + base64.b64encode(buffered.getvalue()).decode("utf-8")
    return data_url

if __name__ == "__main__":
    image_path = '/Users/nikitakhaev/Downloads/images.jpeg'
    with open(image_path, "rb") as image_file:
        encoded_string = base64.b64encode(image_file.read())
    resize_photo(encoded_string)