from flask import Flask, render_template, request

from python.run_algorithms import RunAlgorithms

app = Flask(__name__)


# Route for the home page
@app.route("/")
def home():
    return render_template("index.html")


# Route for the FCFS Algorithm page
@app.route("/fcfs", methods=["GET", "POST"])
def fcfs():
    if request.method == "POST":
        arrival_times = request.form.get("arrival-time")
        burst_times = request.form.get("burst-time")

        return RunAlgorithms().run_fcfs(arrival_times, burst_times)

    return render_template("fcfs.html")


# Route for the SJF Non-SjfPreemptive Algorithm page
@app.route("/sjf-non-preemptive", methods=["GET", "POST"])
def sjf_non_preemptive():
    if request.method == "POST":
        arrival_times = request.form.get("arrival-time")
        burst_times = request.form.get("burst-time")

        return RunAlgorithms().run_sjfnp(arrival_times, burst_times)

    return render_template("sjf_non_preemptive.html")


# Route for the SJF SjfPreemptive Algorithm page
@app.route("/sjf-preemptive", methods=["GET", "POST"])
def sjf_preemptive():
    if request.method == "POST":
        arrival_times = request.form.get("arrival-time")
        burst_times = request.form.get("burst-time")

        return RunAlgorithms().run_sjfp(arrival_times, burst_times)

    return render_template("sjf_preemptive.html")


# Route for the Priority Scheduling Algorithm page
@app.route("/priority-scheduling", methods=["GET", "POST"])
def priority_scheduling():
    if request.method == "POST":
        arrival_times = request.form.get("arrival-time")
        burst_times = request.form.get("burst-time")
        priority = request.form.get("priority")

        return RunAlgorithms().run_priority(arrival_times, burst_times, priority)

    return render_template("priority_scheduling.html")


# Route for the Round Robin Algorithm page
@app.route("/round-robin", methods=["GET", "POST"])
def round_robin():
    if request.method == "POST":
        arrival_times = request.form.get("arrival-time")
        burst_times = request.form.get("burst-time")
        time_quantum = request.form.get("time-quantum")

        return RunAlgorithms().run_rr(arrival_times, burst_times, time_quantum)

    return render_template("round_robin.html")


# Route for Compare Algorithm page
@app.route("/compare", methods=["GET", "POST"])
def compare():
    if request.method == "POST":

        global global_arrival_times
        global global_burst_times
        global global_time_quantum
        global global_priority
        global algo
        global gtta

        algo = request.form.get("algo")
        print("Algorithm accessed : ", algo)

        if algo is None:
            global_arrival_times = request.form.get("arrival-time")
            global_burst_times = request.form.get("burst-time")
            global_time_quantum = request.form.get("time-quantum")
            global_priority = request.form.get("priority")

        else:
            run = RunAlgorithms()
            global_time_quantum = request.form.get("tQ")
            global_priority = request.form.get("priority")

            if algo == "fcfs":
                return run.run_fcfs(global_arrival_times, global_burst_times)

            elif algo == "sjfnp":
                return run.run_sjfnp(global_arrival_times, global_burst_times)

            if algo == "sjfp":
                return run.run_sjfp(global_arrival_times, global_burst_times)

            elif algo == "priority":
                return run.run_priority(
                    global_arrival_times, global_burst_times, global_priority
                )

            elif algo == "rr":
                return run.run_rr(
                    global_arrival_times, global_burst_times, global_time_quantum
                )

    return render_template(
        "compare.html", at=global_arrival_times, bt=global_burst_times
    )


# Route for returning to the main menu
@app.route("/index")
def index():
    return render_template("index.html")


if __name__ == "__main__":
    # app.run(debug=True)
    app.run(host="0.0.0.0", port=5000)
