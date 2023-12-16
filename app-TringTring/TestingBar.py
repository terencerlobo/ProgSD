import pandas as pd
import matplotlib.pyplot as plt

df = pd.DataFrame.from_dict({
    "Language": ['Python', 'Java', 'C', 'C++', 'R', 'JavaScript', 'C#'],
    "Popularity": [100, 96.3, 94.4, 87.5, 81.5, 79.4, 74.5]
})

plt.barh(y=df["Language"], width=df["Popularity"])
plt.show()