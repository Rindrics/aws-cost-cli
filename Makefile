BUILD_DIR = ./dist
SRC_DIR = ./src
NODE_MODULES = ./node_modules
SRC_FILES := $(shell find $(SRC_DIR) -type f)

.PHONY: all install build run

all: build

$(NODE_MODULES):
	pnpm install

install: $(NODE_MODULES)

$(BUILD_DIR): $(SRC_FILS) $(NODE_MODULES)
	pnpm build

build: $(BUILD_DIR)

run: build
	node ./bin/index.js --access-key "${ACCESS_KEY}" --secret-key "${SECRET_KEY}" --role-arn "${ROLE_ARN}" --region ap-northeast-1 -S $(SLACK_TOKEN_AWS_COST_CLI) -C $(SLACK_CHANNEL_ID)

test:
	pnpm test

lint:
	pnpm lint

format:
	pnpm format
