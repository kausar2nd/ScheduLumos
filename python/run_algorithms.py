from python.fcfs import FCFS
from python.sjf_non_preemptive import SjfNonPreemptive
from python.sjf_preemptive import SjfPreemptive
from python.priority_scheduling import PriorityScheduling
from python.round_robin import RoundRobin
from python.utils import Utils


class RunAlgorithms:
    def _format_error(self, error):
        return {"error": f"{type(error).__name__} - {str(error)}"}

    def run_fcfs(self, arrival_times, burst_times):
        try:
            arrival_times = Utils().splitter(arrival_times)
            burst_times = Utils().splitter(burst_times)
            n = len(arrival_times)
            processes = list(range(n))
            if n != len(burst_times):
                raise Exception("Number of Arrival Time and Burst Time must be equal.")
            Utils().input_validation(arrival_times)
            Utils().input_validation(burst_times)
            return FCFS().find_average_time(processes, n, burst_times, arrival_times)
        except Exception as error:
            return self._format_error(error)

    def run_sjfnp(self, arrival_times, burst_times):
        try:
            arrival_times = Utils().splitter(arrival_times)
            burst_times = Utils().splitter(burst_times)
            n = len(arrival_times)
            processes = list(range(n))
            if n != len(burst_times):
                raise Exception("Number of Arrival Time and Burst Time must be equal.")
            Utils().input_validation(arrival_times)
            Utils().input_validation(burst_times)
            return SjfNonPreemptive().find_average_time(
                n, processes, burst_times, arrival_times
            )
        except Exception as error:
            return self._format_error(error)

    def run_sjfp(self, arrival_times, burst_times):
        try:
            arrival_times = Utils().splitter(arrival_times)
            burst_times = Utils().splitter(burst_times)
            n = len(arrival_times)
            processes = list(range(n))
            if n != len(burst_times):
                raise Exception("Number of Arrival Time and Burst Time must be equal.")
            Utils().input_validation(arrival_times)
            Utils().input_validation(burst_times)
            return SjfPreemptive().find_average_time(
                n, processes, burst_times, arrival_times
            )
        except Exception as error:
            return self._format_error(error)

    def run_priority(self, arrival_times, burst_times, priority):
        try:
            arrival_times = Utils().splitter(arrival_times)
            burst_times = Utils().splitter(burst_times)
            n = len(arrival_times)
            processes = list(range(n))
            if not priority:
                priority = list(range(n))
            else:
                priority = Utils().splitter(priority)
            if not (n == len(burst_times) == len(priority)):
                raise Exception(
                    "Number of Arrival Time, Burst Time and Priority must be equal."
                )
            Utils().input_validation(arrival_times)
            Utils().input_validation(burst_times)
            Utils().input_validation(priority)
            return PriorityScheduling().priority_scheduling(
                processes, arrival_times, burst_times, priority
            )
        except Exception as error:
            return self._format_error(error)

    def run_rr(self, arrival_times, burst_times, time_quantum):
        try:
            arrival_times = Utils().splitter(arrival_times)
            burst_times = Utils().splitter(burst_times)
            if not time_quantum:
                time_quantum = 2
            else:
                time_quantum = int(time_quantum)
            n = len(arrival_times)
            processes = list(range(n))
            if n != len(burst_times):
                raise Exception("Number of Arrival Time and Burst Time must be equal.")
            elif time_quantum < 1:
                raise Exception("Time Quantum must be greater than 0.")
            Utils().input_validation(arrival_times)
            Utils().input_validation(burst_times)
            return RoundRobin().round_robin(
                processes, arrival_times, burst_times, time_quantum
            )
        except Exception as error:
            return self._format_error(error)
