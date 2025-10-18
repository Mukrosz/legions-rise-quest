# Image Encoder

Encodes data into PNG images for Stage 2.

## Usage

```bash
pip install pillow cryptography
python stego_encoder.py <input.png> <data> <key> <output.png>
```

## Requirements

- Python 3.7+
- Input: PNG image (400×400+ recommended)
- Data: Text to embed
- Key: Encryption key
- Output: Encoded PNG image

## Example

```bash
python stego_encoder.py source.png "WORD" "KEY" encoded.png
cp encoded.png ../public/enemies/
```

