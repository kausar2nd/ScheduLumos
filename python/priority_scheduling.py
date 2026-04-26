class PriorityScheduling:
    def priority_scheduling(self, processes, arrival_time, burst_time, priority):
        n = len(processes)
        waiting_time = [0] * n
        turnaround_time = [0] * n
        completion_time = [0] * n
        execution_order = []

        current_time = 0
        completed = 0
        is_completed = [False] * n

        while completed != n:
            idx = -1
            highest_priority = float("inf")

            for i in range(n):
                if arrival_time[i] <= current_time and not is_completed[i]:
                    if priority[i] < highest_priority:
                        highest_priority = priority[i]
                        idx = i
                    elif priority[i] == highest_priority:
                        if arrival_time[i] < arrival_time[idx]:
                            idx = i

            if idx != -1:
                waiting_time[idx] = current_time - arrival_time[idx]
                completion_time[idx] = current_time + burst_time[idx]
                turnaround_time[idx] = completion_time[idx] - arrival_time[idx]
                current_time += burst_time[idx]
                is_completed[idx] = True
                completed += 1
                execution_order.append(processes[idx])
            else:
                current_time += 1

        avg_waiting_time = sum(waiting_time) / n
        avg_turnaround_time = sum(turnaround_time) / n

        result_processes = []
        for i in range(n):
            result_processes.append(
                {
                    "id": processes[i],
                    "arrival_time": arrival_time[i],
                    "burst_time": burst_time[i],
                    "waiting_time": waiting_time[i],
                    "turnaround_time": turnaround_time[i],
                    "completion_time": completion_time[i],
                }
            )

        return {
            "processes": result_processes,
            "average_waiting_time": float(f"{avg_waiting_time:.2f}"),
            "average_turnaround_time": float(f"{avg_turnaround_time:.2f}"),
            "gantt_chart": execution_order,
        }
