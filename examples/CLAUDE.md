# examples — notes for Claude

Runnable scripts the user opens and edits often; keep them short and readable
(teaching material). Each `show()` call blocks until Ctrl+C.

| File | Shows |
| --- | --- |
| `demo.py` | The demo network (`neurolume.demo`), currently on `port=8000` for Vite dev |
| `mlp.py` | 784-512-256-10 MLP (`MLP` class is imported by tests) |
| `cnn.py` | LeNet-style CNN in PyTorch (`LeNet` is imported by tests) |
| `keras_cnn.py` | The same LeNet in Keras (`build_lenet()`); must match `cnn.py` exactly |
| `keras_mlp.py` | The MLP in Keras (`build_mlp()`); must match `mlp.py` |
| `system.py` | `System` builder: sensor → encoder → decoder/classifier, plus blocks (`build_system()` is imported by tests) |
| `autoencoder.py` | One `nn.Module` with `self.encoder`/`self.decoder`, auto-split into networks (`Autoencoder` is imported by tests) |

Keras examples set `KERAS_BACKEND=torch` (setdefault) before importing keras.
If you change `cnn.py`, change `keras_cnn.py` the same way (the equivalence test compares them).

The user edits these (layer sizes, ports); treat their changes as intentional.
If a test depends on an example's exact shape, prefer loosening the test.
