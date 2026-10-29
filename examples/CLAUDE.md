# examples — notes for Claude

Runnable scripts the user opens and edits often; keep them short and readable
(teaching material). Each `show()` call blocks until Ctrl+C.

| File | Shows |
| --- | --- |
| `demo.py` | The demo network (`neurolume.demo`), currently on `port=8000` for Vite dev |
| `mlp.py` | 784-512-256-10 MLP (`MLP` class is imported by tests) |
| `system.py` | `System` builder: sensor → encoder → decoder/classifier, plus blocks (`build_system()` is imported by tests) |
| `autoencoder.py` | One `nn.Module` with `self.encoder`/`self.decoder`, auto-split into networks (`Autoencoder` is imported by tests) |

The user edits these (layer sizes, ports); treat their changes as intentional.
If a test depends on an example's exact shape, prefer loosening the test.
