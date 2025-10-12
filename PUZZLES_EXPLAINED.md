# Puzzle Design Philosophy

This document explains the cryptographic and logical design behind each stage, without revealing answers.

---

## Design Principles

1. **Progressive Difficulty**: Each stage builds on previous knowledge
2. **Historical Authenticity**: Ciphers and themes match Roman era
3. **Anti-Spoiler**: Answers not discoverable via source inspection (except Stage III)
4. **Fair Challenge**: All puzzles solvable with hints and logic
5. **Educational**: Teaches classical cryptography

---

## Stage I - Chains of the Captive

### Cipher Type: Caesar Cipher (Substitution)

**Historical Context:**  
Julius Caesar used this cipher to communicate with his generals. Each letter shifts by a fixed number (traditionally 3).

**Puzzle Mechanics:**
- Encrypted message displayed
- User must determine shift value (0-25)
- Apply reverse shift to decode

**Learning Objective:**  
Introduction to substitution ciphers and brute-force testing.

**Tools Allowed:**
- Manual decoding (alphabet wheel)
- Online Caesar cipher decoders
- Python/JavaScript scripts

**Anti-Reverse-Engineering:**
- Answer stored as `sha256(pepper + normalized_answer)`
- Pepper: "ROMA" (stable, documented in code)
- Hash comparison only; no plaintext in bundle

**Hint System:**
1. "Shift your view by Roman count" → Suggests Caesar cipher
2. "The shift is modest" → Indicates small shift value

---

## Stage II - Blood of the Arena

### Cipher Type: Steganography + Logic Riddle

**Historical Context:**  
Hidden messages in images, documents, or objects. Roman spies used wax tablets with hidden layers.

**Puzzle Mechanics:**
- Visual puzzle with three gladiator ranks
- Each rank contains letter clues
- Logic combines clues into final word

**Learning Objective:**  
Pattern recognition, metadata extraction, logical deduction.

**Implementation:**
- Primary: Visual letter extraction
- Backup: Base64 in HTML comment (redundancy)

**Tools Allowed:**
- Inspect element (for HTML comments)
- Manual logic solving
- Note-taking for pattern assembly

**Anti-Reverse-Engineering:**
- Pepper: "RVDIS" (thematic, related to arena)
- Final answer computed from puzzle, not in code
- Hash validation only

**Hint System:**
1. "Pixels whisper" → Suggests hidden data
2. "Three ranks converge" → Logic puzzle hint

---

## Stage III - Citizen's Trial

### Cipher Type: Base64 Encoding (Intended Source Inspection)

**Historical Context:**  
Archivists and scribes hid notes in margins and between lines.

**Puzzle Mechanics:**
- **Explicit source inspection stage**
- Base64 string in HTML comment
- Decode to reveal answer

**Learning Objective:**  
Understanding web page structure, developer tools, Base64 encoding.

**Implementation:**
- Large comment block near top of file
- Clear hints: "inspect source", "scribes leave notes"
- Historical clue narrows down answer

**Tools Allowed:**
- Browser DevTools (View Source)
- Base64 decoder (online or CLI)
- Historical research (Roman orators)

**Why Allowed:**
This stage *intentionally* requires source inspection to teach web fundamentals. It's a meta-puzzle about how web pages work.

**Anti-Reverse-Engineering:**
Still uses pepper ("FORVM") and hash validation to prevent casual spoilers.

**Hint System:**
1. "Records hidden where scribes leave notes" → View source
2. "Look at the foundation—the very source" → Direct instruction

---

## Stage IV - Web of Influence

### Cipher Type: Polybius Square → Vigenère Cipher (Two-Step)

**Historical Context:**  
- **Polybius Square**: Greek historian Polybius (200-118 BCE) invented this grid cipher
- **Vigenère Cipher**: 16th-century polyalphabetic cipher, but conceptually ancient

**Puzzle Mechanics:**

#### Step 1: Polybius Decode
- 5×5 grid (I/J merged, standard)
- Number pairs represent (row, column)
- Decode pairs to letters

#### Step 2: Vigenère Decode
- Take intermediate plaintext from Step 1
- Apply keyword shift (provided in puzzle)
- Decode using Vigenère table

**Learning Objective:**  
Multi-stage decryption, understanding cipher chaining.

**Tools Allowed:**
- Online Polybius decoders
- Vigenère cipher decoders
- Manual tabula recta

**Anti-Reverse-Engineering:**
- **Time-based salt**: Hash rotates daily
- Accepts today OR yesterday (24-hour grace)
- Prevents static hash extraction
- Formula: `salt = SALT + floor(Date.now()/86400000).toBase36()`

**Implementation Detail:**
Two precomputed hashes stored:
1. Today's hash
2. Yesterday's hash

Validator checks both, allowing users who started puzzle yesterday to complete it today.

**Hint System:**
1. "Numbers hide in mosaic corners—five by five" → Polybius grid
2. "A keyword from history veils the truth once more" → Vigenère with known keyword

---

## Stage V - Vox Senatus

### Cipher Type: Keyed Challenge (Name Recall)

**Historical Context:**  
Final test of journey comprehension. No cipher, but validation complexity.

**Puzzle Mechanics:**
- Answer is protagonist's full name
- Revealed throughout story across all stages
- Synthesis of narrative, not cryptographic

**Learning Objective:**  
Attention to detail, narrative immersion, recap of journey.

**Anti-Reverse-Engineering (Advanced):**

1. **Split-Hash XOR**:
   - Hash divided across two validator files
   - `v5a.js` contains part 1
   - `v5b.js` contains part 2
   - XOR merge at runtime
   - Prevents single-file hash extraction

2. **Special Pepper**:
   - Uses "VOX" as pepper (theme-appropriate)
   - Hash: `sha256("VOX" + normalized_input)`

3. **Dynamic Import**:
   - Both validator parts loaded asynchronously
   - Harder to trace through minified bundle

**Implementation:**
```javascript
const [{ p1 }, { p2, target }] = await Promise.all([
  import('@/validators/v5a.js'),
  import('@/validators/v5b.js'),
]);

const expectedHash = xorHex(p1, p2);
const userHash = await sha256Hex('VOX' + normalize(input));
const isCorrect = userHash === target;
```

**Tools Allowed:**
- Re-reading stage narratives
- Taking notes during playthrough
- No cryptographic tools needed

**Hint System:**
1. "Speak the warrior's full name" → Direct but requires recall
2. "His journey began in chains..." → Recap of all stages

---

## Security Summary

| Stage | Technique | Security Level |
|-------|-----------|----------------|
| I | Pepper + hash | Medium |
| II | Pepper + hash | Medium |
| III | Pepper + hash (intentional source) | Low (by design) |
| IV | Time-based salt | High |
| V | Split-hash XOR | Very High |

### Why Not More Security?

This is an **educational puzzle game**, not a production authentication system. Security measures balance:
- **Player experience**: Fair, solvable puzzles
- **Spoiler prevention**: Answers not trivially visible
- **Learning value**: Demonstrates cryptographic concepts

For a real-world system, add:
- Server-side validation
- Rate limiting
- Captcha
- Audit logs

---

## Puzzle Solving Tips (No Spoilers)

### General Strategy
1. Read story carefully (clues in narrative)
2. Use hints after timer (60s, 120s)
3. Try online cipher tools (many available)
4. Take notes across stages
5. Historical context matters

### Recommended Tools
- **Caesar**: dcode.fr, cryptii.com
- **Base64**: base64decode.org, `atob()` in browser console
- **Polybius**: dcode.fr/polybius-cipher
- **Vigenère**: dcode.fr/vigenere-cipher

### Red Herrings
- None intentionally added
- All visual elements serve purpose
- If stuck, re-read hints

---

## Educational Value

### Skills Learned
1. **Classical Cryptography**: Caesar, Polybius, Vigenère
2. **Steganography**: Hidden messages
3. **Web Technologies**: Source inspection, Base64
4. **Problem Solving**: Multi-step logic
5. **Attention to Detail**: Narrative clues

### Historical Accuracy
- Caesar cipher: 100% historical
- Polybius square: Historical (Greek)
- Vigenère: Anachronistic (16th century) but thematically appropriate
- Steganography: Conceptually ancient

### Further Reading
- "The Code Book" by Simon Singh
- "Cryptonomicon" by Neal Stephenson
- Wikipedia: History of Cryptography

---

## For Educators

This project can be used to teach:
- **Computer Science**: Hashing, client-side storage, React
- **History**: Roman Republic, social mobility
- **Mathematics**: Modular arithmetic (Caesar), matrices (Vigenère)
- **Critical Thinking**: Logic puzzles, pattern recognition

**Classroom Use:**
- Pair/group solving encouraged
- Time limits can be adjusted in code
- Hints can be customized
- Progress tracking for assessment

---

*Remember: The joy is in the solving, not the spoiling.*

*SPQR • AD MMXXV*

