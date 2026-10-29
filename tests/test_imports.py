import subprocess
import sys


def test_import_works_without_frameworks() -> None:
    """`import neurolume` must not need torch or tensorflow (plan, section 7)."""
    code = (
        "import sys\n"
        "for name in ('torch', 'tensorflow', 'keras'):\n"
        "    sys.modules[name] = None  # makes any import of it fail\n"
        "import neurolume\n"
        "neurolume.to_graph(neurolume.server.demo_graph())\n"
        "from neurolume.demo import demo_model\n"
        "try:\n"
        "    demo_model()\n"
        "except ImportError:\n"
        "    pass  # show_demo() catches this and falls back to the ready-made graph\n"
        "else:\n"
        "    raise AssertionError('demo_model() should need torch')\n"
    )
    result = subprocess.run([sys.executable, "-c", code], capture_output=True, text=True)
    assert result.returncode == 0, result.stderr
