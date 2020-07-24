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
    "AL": {
      "cost_bos_power": 0.31,
      "cost_bos_area": 52.4
    },
    "AK": {
      "cost_bos_power": 0.33,
      "cost_bos_area": 88.02
    },
    "AZ": {
      "cost_bos_power": 0.32,
      "cost_bos_area": 53.98
    },
    "AR": {
      "cost_bos_power": 0.32,
      "cost_bos_area": 49.52
    },
    "CA": {
      "cost_bos_power": 0.34,
      "cost_bos_area": 70.45
    },
    "CO": {
      "cost_bos_power": 0.31,
      "cost_bos_area": 57.75
    },
    "CT": {
      "cost_bos_power": 0.33,
      "cost_bos_area": 79.55
    },
    "DE": {
      "cost_bos_power": 0.29,
      "cost_bos_area": 62.03
    },
    "DC": {
      "cost_bos_power": 0.33,
      "cost_bos_area": 65.6
    },
    "FL": {
      "cost_bos_power": 0.32,
      "cost_bos_area": 60.06
    },
    "GA": {
      "cost_bos_power": 0.31,
      "cost_bos_area": 53.86
    },
    "HI": {
      "cost_bos_power": 0.34,
      "cost_bos_area": 79.44
    },
    "ID": {
      "cost_bos_power": 0.33,
      "cost_bos_area": 55.95
    },
    "IL": {
      "cost_bos_power": 0.33,
      "cost_bos_area": 77.27
    },
    "IN": {
      "cost_bos_power": 0.33,
      "cost_bos_area": 61.79
    },
    "IA": {
      "cost_bos_power": 0.32,
      "cost_bos_area": 58.3
    },
    "KS": {
      "cost_bos_power": 0.33,
      "cost_bos_area": 55.7
    },
    "KY": {
      "cost_bos_power": 0.32,
      "cost_bos_area": 58.99
    },
    "LA": {
      "cost_bos_power": 0.31,
      "cost_bos_area": 54.65
    },
    "ME": {
      "cost_bos_power": 0.31,
      "cost_bos_area": 62.47
    },
    "MD": {
      "cost_bos_power": 0.32,
      "cost_bos_area": 59.64
    },
    "MA": {
      "cost_bos_power": 0.33,
      "cost_bos_area": 80.22
    },
    "MI": {
      "cost_bos_power": 0.32,
      "cost_bos_area": 63.59
    },
    "MN": {
      "cost_bos_power": 0.33,
      "cost_bos_area": 77.71
    },
    "MS": {
      "cost_bos_power": 0.33,
      "cost_bos_area": 55.87
    },
    "MO": {
      "cost_bos_power": 0.31,
      "cost_bos_area": 63.04
    },
    "MT": {
      "cost_bos_power": 0.3,
      "cost_bos_area": 57.76
    },
    "NE": {
      "cost_bos_power": 0.32,
      "cost_bos_area": 56.55
    },
    "NV": {
      "cost_bos_power": 0.33,
      "cost_bos_area": 63.95
    },
    "NH": {
      "cost_bos_power": 0.29,
      "cost_bos_area": 62.7
    },
    "NJ": {
      "cost_bos_power": 0.34,
      "cost_bos_area": 78.26
    },
    "NM": {
      "cost_bos_power": 0.32,
      "cost_bos_area": 55.27
    },
    "NY": {
      "cost_bos_power": 0.32,
      "cost_bos_area": 75.67
    },
    "NC": {
      "cost_bos_power": 0.31,
      "cost_bos_area": 51.63
    },
    "ND": {
      "cost_bos_power": 0.32,
      "cost_bos_area": 64.58
    },
    "OH": {
      "cost_bos_power": 0.32,
      "cost_bos_area": 61.6
    },
    "OK": {
      "cost_bos_power": 0.31,
      "cost_bos_area": 51.35
    },
    "OR": {
      "cost_bos_power": 0.29,
      "cost_bos_area": 59.97
    },
    "PA": {
      "cost_bos_power": 0.32,
      "cost_bos_area": 65.02
    },
    "RI": {
      "cost_bos_power": 0.33,
      "cost_bos_area": 72.33
    },
    "SC": {
      "cost_bos_power": 0.32,
      "cost_bos_area": 56.34
    },
    "SD": {
      "cost_bos_power": 0.31,
      "cost_bos_area": 52.2
    },
    "TN": {
      "cost_bos_power": 0.33,
      "cost_bos_area": 53.8
    },
    "TX": {
      "cost_bos_power": 0.32,
      "cost_bos_area": 51.95
    },
    "UT": {
      "cost_bos_power": 0.32,
      "cost_bos_area": 55.17
    },
    "VT": {
      "cost_bos_power": 0.32,
      "cost_bos_area": 57.69
    },
    "VA": {
      "cost_bos_power": 0.32,
      "cost_bos_area": 55.64
    },
    "WA": {
      "cost_bos_power": 0.34,
      "cost_bos_area": 65.11
    },
    "WV": {
      "cost_bos_power": 0.32,
      "cost_bos_area": 60.52
    },
    "WI": {
      "cost_bos_power": 0.32,
      "cost_bos_area": 68.12
    },
    "WY": {
      "cost_bos_power": 0.32,
      "cost_bos_area": 55.4
    },
    "PR": {
      "cost_bos_power": 0.35,
      "cost_bos_area": 56.21
    }
  },
  "single-axis tracked, utility scale": {
    "AL": {
      "cost_bos_power": 0.31,
      "cost_bos_area": 65.03
    },
    "AK": {
      "cost_bos_power": 0.33,
      "cost_bos_area": 101.77
    },
    "AZ": {
      "cost_bos_power": 0.32,
      "cost_bos_area": 66.88
    },
    "AR": {
      "cost_bos_power": 0.32,
      "cost_bos_area": 62.04
    },
    "CA": {
      "cost_bos_power": 0.34,
      "cost_bos_area": 84.89
    },
    "CO": {
      "cost_bos_power": 0.31,
      "cost_bos_area": 70.58
    },
    "CT": {
      "cost_bos_power": 0.33,
      "cost_bos_area": 94.07
    },
    "DE": {
      "cost_bos_power": 0.29,
      "cost_bos_area": 74.89
    },
    "DC": {
      "cost_bos_power": 0.33,
      "cost_bos_area": 79.24
    },
    "FL": {
      "cost_bos_power": 0.33,
      "cost_bos_area": 72.88
    },
    "GA": {
      "cost_bos_power": 0.31,
      "cost_bos_area": 66.5
    },
    "HI": {
      "cost_bos_power": 0.34,
      "cost_bos_area": 93.83
    },
    "ID": {
      "cost_bos_power": 0.33,
      "cost_bos_area": 68.84
    },
    "IL": {
      "cost_bos_power": 0.33,
      "cost_bos_area": 92.22
    },
    "IN": {
      "cost_bos_power": 0.33,
      "cost_bos_area": 75.48
    },
    "IA": {
      "cost_bos_power": 0.33,
      "cost_bos_area": 71.45
    },
    "KS": {
      "cost_bos_power": 0.33,
      "cost_bos_area": 68.72
    },
    "KY": {
      "cost_bos_power": 0.32,
      "cost_bos_area": 72.43
    },
    "LA": {
      "cost_bos_power": 0.31,
      "cost_bos_area": 67.36
    },
    "ME": {
      "cost_bos_power": 0.32,
      "cost_bos_area": 75.44
    },
    "MD": {
      "cost_bos_power": 0.32,
      "cost_bos_area": 72.88
    },
    "MA": {
      "cost_bos_power": 0.33,
      "cost_bos_area": 94.77
    },
    "MI": {
      "cost_bos_power": 0.32,
      "cost_bos_area": 77.29
    },
    "MN": {
      "cost_bos_power": 0.33,
      "cost_bos_area": 92.09
    },
    "MS": {
      "cost_bos_power": 0.33,
      "cost_bos_area": 68.62
    },
    "MO": {
      "cost_bos_power": 0.31,
      "cost_bos_area": 76.57
    },
    "MT": {
      "cost_bos_power": 0.3,
      "cost_bos_area": 70.44
    },
    "NE": {
      "cost_bos_power": 0.32,
      "cost_bos_area": 69.5
    },
    "NV": {
      "cost_bos_power": 0.33,
      "cost_bos_area": 77.73
    },
    "NH": {
      "cost_bos_power": 0.29,
      "cost_bos_area": 75.47
    },
    "NJ": {
      "cost_bos_power": 0.34,
      "cost_bos_area": 92.87
    },
    "NM": {
      "cost_bos_power": 0.32,
      "cost_bos_area": 68.15
    },
    "NY": {
      "cost_bos_power": 0.32,
      "cost_bos_area": 89.49
    },
    "NC": {
      "cost_bos_power": 0.31,
      "cost_bos_area": 64.08
    },
    "ND": {
      "cost_bos_power": 0.32,
      "cost_bos_area": 77.79
    },
    "OH": {
      "cost_bos_power": 0.32,
      "cost_bos_area": 75.1
    },
    "OK": {
      "cost_bos_power": 0.31,
      "cost_bos_area": 64.01
    },
    "OR": {
      "cost_bos_power": 0.29,
      "cost_bos_area": 72.95
    },
    "PA": {
      "cost_bos_power": 0.32,
      "cost_bos_area": 78.68
    },
    "RI": {
      "cost_bos_power": 0.33,
      "cost_bos_area": 86.16
    },
    "SC": {
      "cost_bos_power": 0.32,
      "cost_bos_area": 69.11
    },
    "SD": {
      "cost_bos_power": 0.31,
      "cost_bos_area": 64.73
    },
    "TN": {
      "cost_bos_power": 0.33,
      "cost_bos_area": 66.75
    },
    "TX": {
      "cost_bos_power": 0.32,
      "cost_bos_area": 64.67
    },
    "UT": {
      "cost_bos_power": 0.32,
      "cost_bos_area": 67.97
    },
    "VT": {
      "cost_bos_power": 0.32,
      "cost_bos_area": 70.77
    },
    "VA": {
      "cost_bos_power": 0.32,
      "cost_bos_area": 68.38
    },
    "WA": {
      "cost_bos_power": 0.34,
      "cost_bos_area": 78.94
    },
    "WV": {
      "cost_bos_power": 0.33,
      "cost_bos_area": 73.6
    },
    "WI": {
      "cost_bos_power": 0.32,
      "cost_bos_area": 81.82
    },
    "WY": {
      "cost_bos_power": 0.32,
      "cost_bos_area": 68.23
    },
    "PR": {
      "cost_bos_power": 0.35,
      "cost_bos_area": 68.04
    }
  },
  "roof-mounted, residential scale": {
    "AL": {
      "cost_bos_power": 2.0,
      "cost_bos_area": 63.45
    },
    "AK": {
      "cost_bos_power": 1.98,
      "cost_bos_area": 78.68
    },
    "AZ": {
      "cost_bos_power": 2.0,
      "cost_bos_area": 64.83
    },
    "AR": {
      "cost_bos_power": 2.0,
      "cost_bos_area": 63.06
    },
    "CA": {
      "cost_bos_power": 2.04,
      "cost_bos_area": 74.39
    },
    "CO": {
      "cost_bos_power": 1.98,
      "cost_bos_area": 65.42
    },
    "CT": {
      "cost_bos_power": 2.05,
      "cost_bos_area": 73.43
    },
    "DE": {
      "cost_bos_power": 1.95,
      "cost_bos_area": 65.55
    },
    "DC": {
      "cost_bos_power": 2.05,
      "cost_bos_area": 73.36
    },
    "FL": {
      "cost_bos_power": 2.01,
      "cost_bos_area": 62.73
    },
    "GA": {
      "cost_bos_power": 1.99,
      "cost_bos_area": 63.12
    },
    "HI": {
      "cost_bos_power": 2.07,
      "cost_bos_area": 76.94
    },
    "ID": {
      "cost_bos_power": 2.0,
      "cost_bos_area": 65.15
    },
    "IL": {
      "cost_bos_power": 2.01,
      "cost_bos_area": 81.37
    },
    "IN": {
      "cost_bos_power": 2.01,
      "cost_bos_area": 72.9
    },
    "IA": {
      "cost_bos_power": 2.0,
      "cost_bos_area": 67.76
    },
    "KS": {
      "cost_bos_power": 2.01,
      "cost_bos_area": 67.0
    },
    "KY": {
      "cost_bos_power": 2.0,
      "cost_bos_area": 67.12
    },
    "LA": {
      "cost_bos_power": 2.0,
      "cost_bos_area": 64.67
    },
    "ME": {
      "cost_bos_power": 2.0,
      "cost_bos_area": 65.8
    },
    "MD": {
      "cost_bos_power": 2.04,
      "cost_bos_area": 68.58
    },
    "MA": {
      "cost_bos_power": 2.08,
      "cost_bos_area": 76.37
    },
    "MI": {
      "cost_bos_power": 2.0,
      "cost_bos_area": 71.54
    },
    "MN": {
      "cost_bos_power": 2.0,
      "cost_bos_area": 73.66
    },
    "MS": {
      "cost_bos_power": 2.01,
      "cost_bos_area": 64.5
    },
    "MO": {
      "cost_bos_power": 1.97,
      "cost_bos_area": 71.47
    },
    "MT": {
      "cost_bos_power": 1.98,
      "cost_bos_area": 69.14
    },
    "NE": {
      "cost_bos_power": 2.0,
      "cost_bos_area": 63.76
    },
    "NV": {
      "cost_bos_power": 1.96,
      "cost_bos_area": 70.95
    },
    "NH": {
      "cost_bos_power": 2.01,
      "cost_bos_area": 66.51
    },
    "NJ": {
      "cost_bos_power": 2.05,
      "cost_bos_area": 75.85
    },
    "NM": {
      "cost_bos_power": 1.99,
      "cost_bos_area": 64.35
    },
    "NY": {
      "cost_bos_power": 2.03,
      "cost_bos_area": 74.33
    },
    "NC": {
      "cost_bos_power": 1.94,
      "cost_bos_area": 61.03
    },
    "ND": {
      "cost_bos_power": 2.0,
      "cost_bos_area": 69.94
    },
    "OH": {
      "cost_bos_power": 2.0,
      "cost_bos_area": 68.82
    },
    "OK": {
      "cost_bos_power": 2.0,
      "cost_bos_area": 65.57
    },
    "OR": {
      "cost_bos_power": 1.95,
      "cost_bos_area": 72.55
    },
    "PA": {
      "cost_bos_power": 2.0,
      "cost_bos_area": 69.6
    },
    "RI": {
      "cost_bos_power": 2.01,
      "cost_bos_area": 68.79
    },
    "SC": {
      "cost_bos_power": 2.0,
      "cost_bos_area": 63.05
    },
    "SD": {
      "cost_bos_power": 2.0,
      "cost_bos_area": 63.59
    },
    "TN": {
      "cost_bos_power": 1.97,
      "cost_bos_area": 65.44
    },
    "TX": {
      "cost_bos_power": 1.99,
      "cost_bos_area": 64.18
    },
    "UT": {
      "cost_bos_power": 1.97,
      "cost_bos_area": 65.12
    },
    "VT": {
      "cost_bos_power": 2.05,
      "cost_bos_area": 66.23
    },
    "VA": {
      "cost_bos_power": 2.0,
      "cost_bos_area": 65.28
    },
    "WA": {
      "cost_bos_power": 1.99,
      "cost_bos_area": 74.39
    },
    "WV": {
      "cost_bos_power": 2.0,
      "cost_bos_area": 67.56
    },
    "WI": {
      "cost_bos_power": 2.0,
      "cost_bos_area": 71.04
    },
    "WY": {
      "cost_bos_power": 2.0,
      "cost_bos_area": 69.39
    },
    "PR": {
      "cost_bos_power": 2.0,
      "cost_bos_area": 54.96
    }
  }
}