class SjfNonPreemptive:
    def find_waiting_time(self, processes, n, bt, wt, at):
        remaining_bt = bt[:]
        completed = 0
        current_time = 0
        execution_order = []

        while completed != n:
            shortest_index = -1
            shortest_bt = float("inf")

            for i in range(n):
                if at[i] <= current_time and shortest_bt > remaining_bt[i] > 0:
                    shortest_bt = remaining_bt[i]
                    shortest_index = i

            if shortest_index == -1:
                current_time += 1
                continue

            current_time += bt[shortest_index]
            remaining_bt[shortest_index] = 0
            wt[shortest_index] = current_time - bt[shortest_index] - at[shortest_index]
            execution_order.append(shortest_index)

            if wt[shortest_index] < 0:
                wt[shortest_index] = 0

            completed += 1
        return execution_order

    def find_turn_around_time(self, n, bt, wt, tat):
        for i in range(n):
            tat[i] = bt[i] + wt[i]

    def find_average_time(self, n, processes, bt, at):
        wt = [0] * n
        tat = [0] * n

        execution_order = self.find_waiting_time(processes, n, bt, wt, at)
        self.find_turn_around_time(n, bt, wt, tat)

        total_wt = sum(wt)
        total_tat = sum(tat)

        result_processes = []
        for i in range(n):
            result_processes.append(
                {
                    "id": i,
                    "arrival_time": at[i],
                    "burst_time": bt[i],
                    "waiting_time": wt[i],
                    "turnaround_time": tat[i],
                    "completion_time": at[i] + tat[i],
                }
            )

        return {
            "processes": result_processes,
            "average_waiting_time": float(f"{total_wt / n:.2f}"),
            "average_turnaround_time": float(f"{total_tat / n:.2f}"),
            "gantt_chart": execution_order,
        }
