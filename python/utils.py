class Utils:
    def splitter(self, string):
        return list(map(int, string.strip().split(" ")))

    def input_validation(self, times):
        for i in times:
            if i < 0:
                raise Exception("All Inputs must be positive.")
