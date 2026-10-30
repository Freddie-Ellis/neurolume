# examples — notes for Claude

Runnable scripts the user opens and edits often; keep them short and readable
(teaching material). Each `show()` call blocks until Ctrl+C.

| File | Shows |
| --- | --- |
| `demo.py` | The demo network (`neurolume.demo`), currently on `port=8000` for Vite dev |
| `mlp.py` | 784-512-256-10 MLP (`MLP` class is imported by tests) |
| `cnn.py` | LeNet-style CNN in PyTorch (`LeNet` is imported by tests), fed `sample_digit()` so slabs show real feature maps |
| `keras_cnn.py` | The same LeNet in Keras (`build_lenet()`); must match `cnn.py` exactly |
| `keras_mlp.py` | The MLP in Keras (`build_mlp()`); must match `mlp.py` |
| `system.py` | `System` builder: sensor → encoder → decoder/classifier, plus blocks (`build_system()` is imported by tests) |
| `live_training.py` | `neurolume.watch()` on a small regression MLP that overfits 200 noisy examples on purpose (validation turns up around step 6,000): `split="val"`, `predictions()` scatter, the Training panel's verdict |
| `live_nested_system.py` | The plant monitor of `nested_system.py` trained live (it builds its own copy around networks it holds, since `build_system()` keeps its models inside): denoiser + fault-detector System, `network=` and `split=` logging per network, confusion matrix; ~25 s |
| `live_resnet.py` | torchvision ResNet-18 trained live on a toy task (which way up a noisy, shifted 7 is; no download): live feature maps, `loss/val`, confusion matrix, timeline. Needs torchvision |
| `keras_live.py` | The Keras MLP trained live with `neurolume.keras.Live` (synthetic 28x28 data, validation split) |
| `qt_live.py` | A Qt training logger: Start/Stop and a step readout beside `NeurolumeWidget.watch()`, training `live_training.py`'s regression model on a background thread (the panel polls with a QTimer). Needs qtpy + PySide6 |
| `qt_widget.py` | The viewer embedded in a Qt window via `NeurolumeWidget` (needs qtpy + PySide6) |
| `autoencoder.py` | One `nn.Module` with `self.encoder`/`self.decoder`, auto-split into networks (`Autoencoder` is imported by tests) |
| `nested_system.py` | A System holding the Autoencoder (opens as its own overview) and the whole `build_system()` System (links attach to its sensor/prediction ends) |
| `branches.py` | Flat CNN with a residual add and a 1x1/3x3 concat: skip arcs in one view (`Branches` is imported by tests) |
| `resnet.py` | torchvision ResNet-18 (needs `torchvision`): stem → layer1–4 → head, stages open to blocks, blocks to layers |
| `keras_resnet.py` | Keras ResNet from nested `keras.Model` blocks (`build_resnet()` is imported by tests); blocks are built at the size they receive so shapes are known |

Keras examples set `KERAS_BACKEND=torch` (setdefault) before importing keras.
If you change `cnn.py`, change `keras_cnn.py` the same way (the equivalence test compares them).

The user edits these (layer sizes, ports); treat their changes as intentional.
If a test depends on an example's exact shape, prefer loosening the test.
