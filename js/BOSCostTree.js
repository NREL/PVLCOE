/*
Copyright 2020 Alliance for Sustainable Energy, LLC
 
Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
 
1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
 
2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
 
3. Neither the name of the copyright holder nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
 
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

var cost_bos_tree = {
  "fixed tilt, utility scale": {
    "1.1": {
      "cost_bos_power": 0.21,
      "cost_bos_area": 53.38
    },
    "1.3": {
      "cost_bos_power": 0.2,
      "cost_bos_area": 53.38
    },
    "1.4": {
      "cost_bos_power": 0.19,
      "cost_bos_area": 53.77
    }
  },
  "single-axis tracked, utility scale": {
    "1.1": {
      "cost_bos_power": 0.21,
      "cost_bos_area": 66.67
    },
    "1.3": {
      "cost_bos_power": 0.2,
      "cost_bos_area": 66.67
    },
    "1.4": {
      "cost_bos_power": 0.19,
      "cost_bos_area": 67.12
    }
  },
  "roof-mounted, residential scale": {
    "1.1": {
      "cost_bos_power": 1.93,
      "cost_bos_area": 28.28
    },
    "1.3": {
      "cost_bos_power": 1.86,
      "cost_bos_area": 28.27
    },
    "1.4": {
      "cost_bos_power": 1.83,
      "cost_bos_area": 28.41
    }
  },
  "roof-mounted, commercial scale": {
    "1.1": {
      "cost_bos_power": 0.78,
      "cost_bos_area": 96.14
    },
    "1.3": {
      "cost_bos_power": 0.7,
      "cost_bos_area": 96.09
    },
    "1.4": {
      "cost_bos_power": 0.61,
      "cost_bos_area": 96.8
    }
  },
  "fixed tilt, commercial scale": {
    "1.1": {
      "cost_bos_power": 0.38,
      "cost_bos_area": 103.59
    },
    "1.3": {
      "cost_bos_power": 0.36,
      "cost_bos_area": 103.59
    },
    "1.4": {
      "cost_bos_power": 0.36,
      "cost_bos_area": 104.3
    }
  }
}