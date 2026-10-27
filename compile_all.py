# -*- coding: utf-8 -*-
"""
Master compiler that joins all 23 chapters and writes to js/data/chapters.js
"""
import json
import os

from generate_all_chapters import get_module_1_2
from build_part2 import get_ch07_to_ch14
from build_part3 import get_ch15_to_ch23

m1_2 = get_module_1_2()
part2 = get_ch07_to_ch14()
part3 = get_ch15_to_ch23()

all_chapters = m1_2 + part2 + part3

print(f"Total chapters: {len(all_chapters)}")

total_screens = sum(len(ch["screens"]) for ch in all_chapters)
print(f"Total screens: {total_screens}")

for i, ch in enumerate(all_chapters):
    expected_id = f"{i+1:02d}"
    assert ch["id"] == expected_id, f"Chapter index mismatch: {ch['id']} vs {expected_id}"

# Write to js/data/chapters.js
js_content = f"""// DEV. SAHIL - NETWORKING STUDIO
// Complete curriculum dataset: 23 Chapters, 114 Lesson Screens, Full Cyber Context
(function() {{
  var root = typeof window !== 'undefined' ? window : (typeof global !== 'undefined' ? global : this);
  root.NETWORKING_STUDIO_CHAPTERS = {json.dumps(all_chapters, indent=2, ensure_ascii=False)};
  if (typeof module !== 'undefined' && module.exports) {{
    module.exports = root.NETWORKING_STUDIO_CHAPTERS;
  }}
}})();
"""

out_path = os.path.join(os.path.dirname(__file__), "js", "data", "chapters.js")
with open(out_path, "w", encoding="utf-8") as f:
    f.write(js_content)

print(f"Successfully generated {out_path} ({os.path.getsize(out_path)} bytes)")
