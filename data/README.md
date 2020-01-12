# Get data from Drupal.org api

Launching a script deletes the previously fetched data in their respective directory.

## Todo's

- Document Python dependencies.
- Automate for weekly updates.
- Add option for incremental update (compares what exists) and full update (deletes first)

## Fetch

Cd in the `data/fetch` directory.

- Core users: `python3 get_core_users.py`
- Core project: `python3 get_yearly_core_project_usage.py`
- Project usage (deprecated): fetches projects from the usage table `python3 get_yearly_project_usage.py`

### Fetch projects straight from the API.

Sorts by download count the aggregation is sorted with the total usage by version and limited to a subset.

- Contributed modules: `python3 get_projects_usage_by_type.py --project_type=module`
- Contributed themes: `python3 get_projects_usage_by_type.py --project_type=theme`
- Contributed distributions: `python3 get_projects_usage_by_type.py --project_type=distribution`

## Aggregate

Cd in the `data/aggregate` directory.

- Core users: `python3 aggregate_core_users.py`
- Core project: `python3 aggregate_core_project.py`
- Contributed modules: `python3 aggregate_projects.py --project_type=module`
- Contributed themes: `python3 aggregate_projects.py --project_type=theme`
- Contributed distributions: `python3 aggregate_projects.py --project_type=distribution`

## Copy results

Results currently needs to be copied from the `data/aggregate` to the `public/data` directory.

Expected files:

- core_project.json
- core_users.json
- projects_distribution.json
- projects_module.json
- projects_theme.json
