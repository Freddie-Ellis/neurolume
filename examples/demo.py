"""Visualise the demo network: a small PyTorch classifier built in neurolume/demo.py.

This is the same as `neurolume.show_demo()`, written out so you can see the
two things Neurolume needs: a model and an example input.
"""

import neurolume
from neurolume.demo import demo_input, demo_model

if __name__ == "__main__":
    neurolume.show(demo_model(nested=True), demo_input(), port=8000)
