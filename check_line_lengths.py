import os

def check_line_lengths(directory, max_length=120):
    issues = []
    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith(('.java', '.xml', '.properties')):
                file_path = os.path.join(root, file)
                with open(file_path, 'r', encoding='utf-8') as f:
                    for line_number, line in enumerate(f, start=1):
                        if len(line) > max_length:
                            issues.append(f"{file_path}:{line_number}: {len(line)} characters")
    return issues

if __name__ == "__main__":
    directory_to_check = '.'
    max_length = 120
    issues = check_line_lengths(directory_to_check)

    if issues:
        print("Lines exceeding maximum length:")
        for issue in issues:
            print(issue)
        exit(1)  # Возвращаем код ошибки
    else:
        print("All lines are within the maximum length.")