from flask import Flask, render_template, request, jsonify

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

        return jsonify(RunAlgorithms().run_fcfs(arrival_times, burst_times))

    return render_template("fcfs.html")


# Route for the SJF Non-SjfPreemptive Algorithm page
@app.route("/sjf-non-preemptive", methods=["GET", "POST"])
def sjf_non_preemptive():
    if request.method == "POST":
        arrival_times = request.form.get("arrival-time")
        burst_times = request.form.get("burst-time")

        return jsonify(RunAlgorithms().run_sjfnp(arrival_times, burst_times))

    return render_template("sjf_non_preemptive.html")


# Route for the SJF SjfPreemptive Algorithm page
@app.route("/sjf-preemptive", methods=["GET", "POST"])
def sjf_preemptive():
    if request.method == "POST":
        arrival_times = request.form.get("arrival-time")
        burst_times = request.form.get("burst-time")

        return jsonify(RunAlgorithms().run_sjfp(arrival_times, burst_times))

    return render_template("sjf_preemptive.html")


# Route for the Priority Scheduling Algorithm page
@app.route("/priority-scheduling", methods=["GET", "POST"])
def priority_scheduling():
    if request.method == "POST":
        arrival_times = request.form.get("arrival-time")
        burst_times = request.form.get("burst-time")
        priority = request.form.get("priority")

        return jsonify(
            RunAlgorithms().run_priority(arrival_times, burst_times, priority)
        )

    return render_template("priority_scheduling.html")


# Route for the Round Robin Algorithm page
@app.route("/round-robin", methods=["GET", "POST"])
def round_robin():
    if request.method == "POST":
        arrival_times = request.form.get("arrival-time")
        burst_times = request.form.get("burst-time")
        time_quantum = request.form.get("time-quantum")

        return jsonify(RunAlgorithms().run_rr(arrival_times, burst_times, time_quantum))

    return render_template("round_robin.html")


# Route for returning to the main menu
@app.route("/index")
def index():
    return render_template("index.html")


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
