class FCFS:
    def sort_processes(self, n, processes, bt, at):
        for i in range(n - 1):
            for j in range(n - i - 1):
                if at[j] > at[j + 1]:
                    # Swap elements in all arrays
                    at[j], at[j + 1] = at[j + 1], at[j]
                    bt[j], bt[j + 1] = bt[j + 1], bt[j]
                    processes[j], processes[j + 1] = processes[j + 1], processes[j]

    def find_waiting_time(self, n, bt, wt, at):
        service_time = [at[0]]
        wt[0] = 0
        for i in range(1, n):
            # The start time for process i is max(arrival time, completion of previous)
            start_time = max(service_time[i - 1] + bt[i - 1], at[i])
            service_time.append(start_time)
            wt[i] = start_time - at[i]

    def find_turnaround_time(self, n, bt, wt, tat):
        for i in range(n):
            tat[i] = bt[i] + wt[i]

    def find_average_time(self, processes, n, bt, at):
        wt = [0] * n
        tat = [0] * n

        self.sort_processes(n, processes, bt, at)
        self.find_waiting_time(n, bt, wt, at)
        self.find_turnaround_time(n, bt, wt, tat)

        total_wt = sum(wt)
        total_tat = sum(tat)
        avg_wt = total_wt / n
        avg_tat = total_tat / n

        result_processes = []
        for i in range(n):
            result_processes.append(
                {
                    "id": processes[i],
                    "arrival_time": at[i],
                    "burst_time": bt[i],
                    "waiting_time": wt[i],
                    "turnaround_time": tat[i],
                    "completion_time": at[i] + tat[i],
                }
            )

        return {
            "processes": result_processes,
            "average_waiting_time": float(f"{avg_wt:.2f}"),
            "average_turnaround_time": float(f"{avg_tat:.2f}"),
            "gantt_chart": processes,
        }
