class SjfPreemptive:
    def find_waiting_time(self, processes, n, bt, wt, at):
        remaining_bt = bt[:]
        completed = 0
        current_time = 0
        min_bt = float("inf")
        shortest = 0
        finish_time = 0
        check = False
        execution_order = []

        # Initialize the waiting time
        wt[:] = [0] * n

        # Process until all processes are completed
        while completed != n:
            # Find process with the shortest remaining time at current_time
            for j in range(n):
                if at[j] <= current_time and min_bt > remaining_bt[j] > 0:
                    min_bt = remaining_bt[j]
                    shortest = j
                    check = True

            if not check:
                current_time += 1
                continue

            # Record the execution order
            execution_order.append(shortest)

            # Reduce remaining time by one unit
            remaining_bt[shortest] -= 1

            # Update minimum
            min_bt = remaining_bt[shortest]
            if min_bt == 0:
                min_bt = float("inf")

            # If a process gets completely executed
            if remaining_bt[shortest] == 0:
                completed += 1
                check = False

                # Find the finish time of current process
                finish_time = current_time + 1

                # Calculate waiting time
                wt[shortest] = finish_time - bt[shortest] - at[shortest]

                if wt[shortest] < 0:
                    wt[shortest] = 0

            # Increment time
            current_time += 1

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
                    "id": processes[i],
                    "arrival_time": at[i],
                    "burst_time": bt[i],
                    "waiting_time": wt[i],
                    "turnaround_time": tat[i],
                    "completion_time": at[i] + tat[i],
                }
            )

        avg_wt = total_wt / n
        avg_tat = total_tat / n

        return {
            "processes": result_processes,
            "average_waiting_time": float(f"{avg_wt:.2f}"),
            "average_turnaround_time": float(f"{avg_tat:.2f}"),
            "gantt_chart": execution_order,
        }
